

import { useOutletContext, useLocation } from "react-router-dom";
import { Box, Typography, styled } from "@mui/material";
import { ArrowBack, Delete } from "@mui/icons-material";
import { emptyProfilePic } from "../constants/constant";
import useApi from "../hooks/useApi";
import { API_URLS } from "../services/api.urls";

const IconWrapper = styled(Box)({
    padding: 15
});
const Subject = styled(Typography)({
    fontSize: 22,
    margin: '10px 0 20px 75px',
    display: 'flex'
})

const Indicator = styled(Box)`
    font-size: 12px !important;
    background: #ddd;
    color: #222;
    border-radius: 4px;
    margin-left: 6px;
    padding: 2px 4px;
    align-self: center;
`;

const Image = styled('img')({
    borderRadius: '50%',
    width: 40,
    height: 40,
    margin: '5px 10px 0 10px',
    backgroundColor: '#cccccc'
});

const Container = styled(Box)({
    marginLeft: 15,
    width: '100%',
    '& > div': {
        display: 'flex',
        '& > p > span': {
            fontSize: 12,
            color: '#5E5E5E'
        }
    }
});

const Date = styled(Typography)({
    margin: '0 50px 0 auto',
    fontSize: 12,
    color: '#5E5E5E'
})

const ViewEmail = () => {

    const {openDrawer} = useOutletContext();
    const { state } = useLocation();
    let email = null; // Declare 'email' with a default value

    if (state) {
        const { email: stateEmail } = state;
        email = stateEmail; // Update the value of 'email' if 'state' exists
    }
   
    const moveEmailsToBinService = useApi(API_URLS.moveEmailsToBin);

    const deleteEmail = () => {
        moveEmailsToBinService.call([email._id]);
        window.history.back();
    }


    return (
        <Box style={ openDrawer ? { marginLeft: 250 }: { width: '100%'}}>
            <IconWrapper>
                <ArrowBack onClick={() => window.history.back()} color="action" fontSize="small"/>
                <Delete fontSize="small" color="action" style={{marginLeft: 40}} onClick={() => deleteEmail()} />
            </IconWrapper>
            <Subject>
                {email.subject} 
                <Indicator component="span">Inbox</Indicator>
            </Subject>
            <Box style={{display: 'flex' }}>
                <Image src={emptyProfilePic} alt="profile" />
                <Container style={{ width: '100%'}}>
                    <Box>
                        <Typography style={{marginTop: 10}}>{email.from}   
                            
                            <Box component="span">&nbsp;&#60;{email.to}&#62;</Box>
                        </Typography>
                        <Date>
                            {(new window.Date(email.date)).getDate()}&nbsp;
                            {(new window.Date(email.date)).toLocaleString('default', { month: 'long' })}&nbsp;
                            {(new window.Date(email.date)).getFullYear()} 
                        </Date>
                    </Box>
                    <Typography style={{ marginTop: 20 }}>{email.body}</Typography>
                </Container>
            </Box>
        
        </Box>

    )
}

export default ViewEmail;