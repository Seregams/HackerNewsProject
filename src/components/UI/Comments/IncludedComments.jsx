import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {FromUTC} from "../../Scripts/dateFormater";

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
                            <Typography component="div" sx={{overflowWrap: 'anywhere'}}>{included.text}</Typography>
                        </Box>
                    )}
                </>
            )}
        </>
    );
};

export default IncludedComments;