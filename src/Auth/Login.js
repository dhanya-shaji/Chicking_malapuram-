import React from "react";
import style from './Login.module.css';
import LaddaButton, { XS, ZOOM_OUT } from "react-ladda";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loading: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }
  //bind textbox values in state
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  login = () => {
    this.setState({ loading: true });
    const username = this.state.username;
    const password = this.state.password;
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    fetch('http://api.chicking-malappuram.in/api/token/', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(result => {
        if (result.access) {
          console.log('Success:', result);
          this.setState({ loading: false });
          sessionStorage.setItem('access', result.access);
          this.props.history.push({ pathname: '/portal/dashboard' });
        }
        else {
          this.setState({
            loading: false,
            username: '',
            password: '',
          });
          alert("Enter valid username and password");
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render() {
    return (
      <div className={style.login_holder}>
        <label className={style.login_head}>Login</label>
        <div>
          <label className={style.title}>Username:</label>
          <input
            type="text"
            onChange={this.handleChange}
            name="username"
            value={this.state.username}
          />
        </div>
        <div>
          <label className={style.title}>Password:</label>
          <input
            type="password"
            onChange={this.handleChange}
            name="password"
            value={this.state.password}
          />
        </div>
        <LaddaButton
          loading={this.state.loading}
          onClick={() => this.login()}
          data-color="#eee"
          data-size={XS}
          data-style={ZOOM_OUT}
          data-spinner-size={30}
          data-spinner-color="#ddd"
          data-spinner-lines={15}
          className="btn-block text-uppercase ladda-button m-r-5 m-b-5"
        >
          LOGIN
                        </LaddaButton>
      </div>
    )
  }
}
export default Login;
