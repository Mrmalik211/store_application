import {Link, Navigate, useNavigate, useNavigation} from 'react-router-dom';
import './navbar.scss';
import {request} from '../../utils/request';

import {
  NotificationsOutlined,
  SearchOutlined,
  HomeOutlined,
  DarkModeOutlined,
  GridViewOutlined,
  ShoppingCartOutlined,
  ExitToApp,
} from '@mui/icons-material';
import {useDispatch} from 'react-redux';
import {logout} from '../../redux/userSlice';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await request.post('/auth/logout');
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to={'/'} style={{textDecoration: 'none', color: 'inherit'}}>
          <span>Ecommerce Test</span>
        </Link>
        <HomeOutlined />
        <DarkModeOutlined />
        <GridViewOutlined />

        <div className="search">
          <SearchOutlined />
          <input type="text" placeholder="Search.." />
        </div>
      </div>
      <div className="right">
        <ShoppingCartOutlined />
        <NotificationsOutlined />
        <ExitToApp onClick={handleLogout} />
        <div className="user">
          <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" />
          <span>Jone Laba</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
