import React, {useEffect, useState} from 'react';
import {getDataIds} from "../services/data";
import {
    Card,
    CardActionArea,
    CardContent,
    LinearProgress,
    Grid, CircularProgress, Link,

} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import UpdateIcon from "@mui/icons-material/Update";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";
import {FromUTC} from "../components/Scripts/dateFormater";

const Index = () => {
    const [data, setData] = useState([])
    const [loadUpdatedData, setLoadUpdatedData] = useState(false)
    // const [isLoadData, setIsLoadData] = useState(false)
    const navigate = useNavigate()

    useEffect( () => {
        if (data.length === 0) {
            setLoadUpdatedData(true)
            async function fetchData() {
                const res = await getDataIds()
                setData(res)
            }
            fetchData()
        }
        return () => setLoadUpdatedData(false)
    }, [data])


    async function updateData() {
        setLoadUpdatedData(true)
        const res =  await getDataIds()
        if (JSON.stringify(res) !== JSON.stringify(data)) {
            setData(res)
        }
        setLoadUpdatedData(false)
    }

    useEffect(() => {
        let timerId = setInterval(() => updateData(), 60000)
        return () => clearInterval(timerId)
    }, [])

    return (
        <div style={{margin:30}}>
            <Box sx={{padding:2, background:'#f6f6f6', borderRadius:'10px', gap:5, display:'flex', flexDirection:'column'}}>
                <Box sx={{ m: 1, position: 'relative', marginBottom:2}}>
                    <Typography variant='h4' sx={{marginBottom:2}}>Top 100 news</Typography>
                    <Button variant="outlined"
                            disabled={loadUpdatedData}
                            endIcon={loadUpdatedData ? <CircularProgress size={20}/> : <UpdateIcon />}
                            onClick={() => updateData()}>{loadUpdatedData ? 'Wait..' : 'Update'}</Button>
                </Box>
                {data.length !== 0 ? data.map((item) =>

                    <Grid item xs={12} md={6}  key={item.id}>
                        <CardActionArea component="div" onClick={()=> navigate(`/news/${item.id}`)}>
                            <Card sx={{ display: 'flex' }}>
                                <CardContent sx={{ flex: 1 }}>
                                    <Typography component="div" variant="subtitle">
                                        {FromUTC(item.time)}
                                    </Typography>
                                    <Typography component="div" variant="h5">
                                        {item.title}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary">
                                        Author: {item.by}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary">
                                        comments: {item.descendants}&nbsp;
                                        Rate: {item.score}
                                    </Typography>
                                    <Box sx={{marginTop:2}}>
                                        <Link color="primary" underline='none' href={`/news/${item.id}`}>
                                            Open
                                        </Link>
                                    </Box>
                                </CardContent>
                            </Card>
                        </CardActionArea>
                    </Grid>
                ) :  <Box sx={{ width: '100%' }}>
                    <LinearProgress  />
                </Box>}
            </Box>
        </div>
    );
};

export default Index;