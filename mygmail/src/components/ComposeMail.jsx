import { useState } from 'react';
import { Dialog, Box, Typography, styled, InputBase, TextField, Button } from '@mui/material'

import { Close, DeleteOutline} from '@mui/icons-material'
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api.urls';

const dialogStyle = {
    height: '90%',
    width: '80%',
    maxHeight: '100%',
    maxWidth: '100%',
    boxShadow: 'none',
    borderRadius: '10px 10px 0 0'
}

const Header = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 15px',
    background: '#F2F6FC',
    '& > p': {
        fontSize: 14,
        fontWeight: 500
    }
});

const RecipientsWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    padding: '0 15px',
    '& > div': {
        fontSize: 14,
        borderBottom: '1px solid #F5F5F5',
        marginTop: 10
    }
});

const Footer = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 15px',

});

const SendButton = styled(Button) ({
    background: '#0B57D0',
    color: '#fff',
    fontWeight: 500,
    textTransform: 'none',
    borderRadius: 18,
    width: 100
});

const ComposeMail = ({openDialog , setOpenDialog}) => {
    const [data, setData] = useState({});
    const sentEmailService = useApi(API_URLS.saveSentEmail);
    const saveDraftService = useApi(API_URLS.saveDraftEmails);

    const config = {
        Host : "smtp.elasticemail.com",
        Username : "sumantpandey234567@yopmail.com",
        Password : "F192952B231B97B48877B6FB1347A5398AC4",
        Port: 2525, 
    }

    const closeComposeMail = (e) => {
        e.preventDefault();
        const payload = {
            to: data.to,
            from: 'codeko.kisama@gmail.com',
            subject: data.subject,
            body: data.body,
            date: new Date(),
            image: '',
            name: 'codekoKisama',
            starred: false,
            type: 'drafts'
        }
        
        //passed payload in call in useapi
        saveDraftService.call(payload);
        if(!saveDraftService.error){
            setOpenDialog(false);
            setData({});
        }else{
       
            setOpenDialog(false);
        }
    }

    
    const sendMail = async (e) => {
        e.preventDefault();
        //using smtpjs.com 
        if(window.Email){
            window.Email.send({
                ...config,
                To : data.to,
                From : "codeko.kisama@gmail.com",
                Subject : data.subject,
                Body : data.body
            }).then(
              message => alert(message)
            );
        }

        const payload = {
            to: data.to,
            from: 'codeko.kisama@gmail.com',
            subject: data.subject,
            body: data.body,
            date: new Date(),
            image: '',
            name: 'codekoKisama',
            starred: false,
            type: 'sent'
        }
        
        //passed payload in call in useapi
        sentEmailService.call(payload);
        if(!sentEmailService.error){
            setOpenDialog(false);
            setData({});
        }else{

        }

     
    }

    const onValueChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value})
        console.log(data);
    }

    return (
        <Dialog open= { openDialog } PaperProps={{sx: dialogStyle}}>
            <Header>
                <Typography>New Message</Typography>
                <Close fontSize="small" onClick = {(e) => closeComposeMail(e)}/>
            </Header>
            <RecipientsWrapper>
                <InputBase placeholder='Recipients' name='to' onChange={(e) => onValueChange(e)} value={data.to}/>
                <InputBase placeholder='Subject' name='subject' onChange={(e) => onValueChange(e)} value={data.subject}/>

            </RecipientsWrapper>
            <TextField 
                multiline 
                rows = {20}
                sx={{ '& .MuiOutlinedInput-notchedOutline' : { border: 'none'}}}
                onChange={(e) => onValueChange(e)}
                name='body'
                value={data.body}
            />
            <Footer>
                <SendButton onClick={(e) => sendMail(e)}>Send</SendButton>  
                <DeleteOutline onClick={() => setOpenDialog(false)}/>
            </Footer>
        </Dialog>
    )
}

export default ComposeMail;