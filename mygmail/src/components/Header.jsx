import { AppBar, Toolbar, InputBase, Box} from "@mui/material";
import { Menu as MenuIcon, Search, Tune, HelpOutline, SettingsOutlined, AppsOutlined, AccountCircleOutlined} from '@mui/icons-material';
import styled from "@emotion/styled";
import { gmaillogo } from "../constants/constant";



const StyledAppBar = styled(AppBar)`
    background: #f5F5F5;
    box-shadow: none;
`;

const SearchWrapper = styled(Box)`
    background: #EAF1FB;
    margin-left: 80px;
    border-radius: 8px;
    min-width: 690px;
    max-width: 720px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    & > div {
        width: 100%
    }
`

const OptionsWrapper = styled(Box)`
    width: 100%;
    display: flex;
    justify-content: end;
    & > svg {
        margin-left: 20px;
    }
`

const Header = ({ toggleDrawer }) => {
    return(
        <StyledAppBar position="static">
            <Toolbar>
                <MenuIcon color="action" onClick = { toggleDrawer }/>
                <img src={gmaillogo} alt="logo" style={{ width: 110, marginLeft: 15}} />
                <SearchWrapper>
                    <Search color="action"/>
                    <InputBase  placeholder="Search Mail" color="action"/>
                    <Tune color="action"/>
                </SearchWrapper>
                <OptionsWrapper>
                    <HelpOutline color="action"/>
                    <SettingsOutlined color="action"/>
                    <AppsOutlined color="action"/>
                    <AccountCircleOutlined color="action"/>
                </OptionsWrapper>
            </Toolbar>
        </StyledAppBar>
    )
}

export default Header;