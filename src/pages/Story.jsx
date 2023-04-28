import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {getComment, getStoryData} from "../services/data";
import {useNavigate, useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Comments from "../components/UI/Comments/Comments";
import {CircularProgress, LinearProgress, Stack} from "@mui/material";
import {FromUTC} from "../components/Scripts/dateFormater";
import Button from "@mui/material/Button";
import UpdateIcon from "@mui/icons-material/Update";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';

const Story = () => {
    const [dataById, setDataById] = useState([])
    const [dataComment, setDataComment] = useState([])
    const [loadUpdatedData, setLoadUpdatedData] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()
    const [comments, setComments] = useState([])

    async function updateComments() {
        setLoadUpdatedData(true)
        const arr = []
        await fetchComment()
        if (arr) {
            console.log({comments})
            console.log({arr})
            setComments([...arr])
            console.log("after", {comments})
        }
        setLoadUpdatedData(false)
        async function fetchComment() {
            for (let i = 0; i < dataComment.length; i++) {
                const commRes = await getComment(dataComment[i])
                arr.push(...commRes)
            }
        }
    }
    useEffect( () => {
        if (dataById.length === 0) {
            setLoadUpdatedData(true)
            async function fetchData() {
                const res = await getStoryData(id)
                setDataById(res)
                if (res[0].kids) {
                    setDataComment(res[0].kids)
                }
            }
            fetchData()
        }
        return setLoadUpdatedData(false)
    }, [dataById, id])

    useEffect(()=> {
        if (dataComment.length !== 0 && comments.length === 0 ) {
            // setLoadUpdatedData(true)
            async function fetchComment() {
                for (let i = 0; i < dataComment.length; i++) {
                    const commRes = await getComment(dataComment[i])
                    setComments(comments => ([...comments, ...commRes]))
                }
            }
            fetchComment()
        }
        // return  setLoadUpdatedData(false)
    }, [dataComment.length, comments.length])

    // console.log(comments)
    return (
        <Box sx={{margin:'20px 30px', padding:2, background:'#f6f6f6', borderRadius:'10px'}}>
            {dataById.length !== 0 ? dataById.map((item) =>
                    <Box key={item.id} sx={{}}>
                        <Box>
                        <Typography component="div" variant="subtitle">
                            {FromUTC(item.time)}
                        </Typography>
                        <Typography component="div" variant="h5">
                            {item.title}
                        </Typography>
                        <Typography component="div" variant="subtitle">
                            By: {item.by}
                        </Typography>
                        <Typography component="a" href={item.url} sx={{overflowWrap: 'anywhere'}}>
                            {item.url}
                        </Typography>
                        <Typography component="div">
                            Сomments: {loadUpdatedData ? <CircularProgress size={12}/> : item.descendants}
                        </Typography>
                        <Stack direction="row" spacing={2} sx={{marginTop:5, marginBottom:2}}>
                            <Button disabled={loadUpdatedData}
                                    startIcon={<ReplyAllIcon />}
                                    onClick={() => navigate('/news')} color='info'>Back</Button>
                            <Button variant="outlined" disabled={loadUpdatedData}
                                    endIcon={loadUpdatedData ? <CircularProgress size={20}/> : <UpdateIcon />}
                                    onClick={() => updateComments()}>{loadUpdatedData ? 'Wait..' : 'Update'}</Button>
                        </Stack>
                        </Box>
                        <Box>
                        {comments.length > 0 ?
                            comments.map((item) =>
                                <Comments data={item} key={item.id}/>
                            ) :
                            <Typography>No Comments</Typography>
                        }
                        </Box>
                    </Box>
            ) :
                <Box sx={{ width: '100%' }}>
                    <LinearProgress  />
                </Box>
            }
        </Box>
    );
};
export default Story;