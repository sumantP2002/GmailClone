// here we need to compose mail when compose button is clicked
import { useState } from 'react';
import {Box , Button, styled, List, ListItem} from '@mui/material'
import { CreateOutlined } from '@mui/icons-material';
import { SIDEBAR_DATA } from '../config/sidebar.config';
import ComposeMail from './ComposeMail';
import { useParams, NavLink } from 'react-router-dom';
import { routes } from '../routes/routes';

const ComposeButton = styled(Button)`
    background: #c2e7ff;
    color: #001d35;
    border-radius: 16px;
    padding: 15px;
    min-width: 140px;
    text-transform: none;
`

const Container = styled(Box)({
    padding: 8,
    '& > ul': {
        padding: '10px 0 0 5px',
        fontsize: 14,
        fontweight: 500,
        cursor: 'pointer',
        '& > a': {
            textDecoration: 'none',
            color: 'inherit'
        }
    },
    '& > ul > a > li >svg': {
        marginRight: 20
    }
})

const SideBarContent = () => {

    const [openDialog, setOpenDialog] = useState(false);

    const { type } = useParams();

    const onComposeClick = () => {
        setOpenDialog(true);
    }
    return(
        <Container>
            <ComposeButton onClick={() => onComposeClick()}>
                <CreateOutlined/>Compose
            </ComposeButton>
          
            <List>
                {
                    // looping inside the array created in size bar config
                    SIDEBAR_DATA.map(data => (
                        <NavLink key={data.name} to={`${routes.emails.path}/${data.name}`}>
                            <ListItem style={type === data.name.toLowerCase() ? {
                                backgroundColor: '#d3e3fd',
                                borderRadius: '0 16px 16px 0'
                                } : {}}>
                                <data.icon fontSize='small'/>{data.title}
                            </ListItem>
                        </NavLink>
                        
                    ))
                }
            </List>
            <ComposeMail openDialog={openDialog} setOpenDialog={setOpenDialog}/>
        </Container>
    )
}

export default SideBarContent;