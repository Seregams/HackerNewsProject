import React, {useState} from 'react';
import {Card, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ExpandMoreSharpIcon from '@mui/icons-material/ExpandMoreSharp';
import KeyboardArrowUpSharpIcon from '@mui/icons-material/KeyboardArrowUpSharp';
import {getComment} from "../../../services/data";
import IncludedComments from "./IncludedComments";
import {FromUTC} from "../../Scripts/dateFormater";
import Box from "@mui/material/Box";

const Comments = (data) => {
    const [dataIncludeComment, setDataIncludeComment] = useState([])
    const [showsIncludeComment, setShowsIncludeComment] = useState(false)
    const item = data.data

    function openIncludeComments (item) {
        if (showsIncludeComment) {
            setShowsIncludeComment(false)
        } else {
            getIncludeComment(item)
            setShowsIncludeComment(true)
        }
    }
    function getIncludeComment(item) {
        if (item.kids) {
            const mainId = item.id
            const array = []
            async function fetchIncludeComment(item, mainId) {
                console.log("заход в асинх")
                for (let i = 0; i < item.length; i++) {
                    const includeCommRes = await getComment(item[i])
                    includeCommRes[0].Idmain = mainId
                    const check = (e) => includeCommRes.includes(e.id);

                    if (!array.some(check)) {
                        array.push(...includeCommRes)
                        console.log("запушил в Array")
                    }

                    if (includeCommRes.some(e => e.kids)) {
                        console.log("нашел детей")
                        await fetchIncludeComment(includeCommRes[0].kids, mainId)
                    }

                }
                console.log("выход из рекурсии")
                return setDataIncludeComment([...array])
                // setDataIncludeComment(DataIncludeComment => ([...DataIncludeComment, ...includeCommRes]))
            }
            fetchIncludeComment(item.kids, mainId)
        }

        console.log({dataIncludeComment})
    }

    return (
        <>
            {item && (
                <Card sx={{margin:'20px 0px'}}>
                    <CardContent sx={{ flex: 1 }}>
                        <Typography component="div" variant="h6">{item.by}</Typography>
                        <Typography component="div">{FromUTC(item.time)}</Typography>
                        <Typography component="div" sx={{overflowWrap: 'anywhere'}}>{item.text}</Typography>
                        <Box sx={{marginTop:2}}>
                        {item.kids ?
                            <Button onClick={()=> openIncludeComments(item)}
                                    startIcon={showsIncludeComment ? <KeyboardArrowUpSharpIcon/> : <ExpandMoreSharpIcon/>}>
                                {showsIncludeComment ? "Hide" : "Show all"}
                            </Button>
                            : <> </>}
                        </Box>
                        <>
                            {dataIncludeComment ? dataIncludeComment.map(includedItem =>
                                <IncludedComments data={includedItem} show={showsIncludeComment} parent={item.id}/>
                            ): <></> }
                        </>
                    </CardContent>
                </Card>
            )}
        </>
    );
};

export default Comments;