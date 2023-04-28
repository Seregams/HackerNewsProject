import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {FromUTC} from "../../Scripts/dateFormater";
import ReactMarkdown from "react-markdown";

const IncludedComments = ({data, show, parent}) => {
    const included = data
    console.log(included)
    return (
        <>
            {included.Idmain === parent && (
                <>
                    {show && (
                        <Box key={included.id} sx={{margin:5}}>
                            <Typography component="div">{included.by}</Typography>
                            <Typography component="div">{FromUTC(included.time)}</Typography>
                            <Typography component="div" sx={{overflowWrap: 'anywhere'}}><ReactMarkdown skipHtml={true}>{included.text}</ReactMarkdown></Typography>
                        </Box>
                    )}
                </>
            )}
        </>
    );
};

export default IncludedComments;