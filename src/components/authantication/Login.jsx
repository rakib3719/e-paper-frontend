'use client'
import * as React from 'react';
import {
  Button,
  FormControl,
  Checkbox,
  FormControlLabel,
  InputLabel,
  OutlinedInput,
  TextField,
  InputAdornment,
  Link,
  Alert,
  IconButton,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import axiosInstance from '@/utils/axios';
import Swal from 'sweetalert2';
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

const providers = [{ id: 'credentials', name: 'Email and Password' }];

function CustomEmailField() {
  return (
    <TextField
      id="input-with-icon-textfield"
      label="Email"
      name="email"
      type="email"
      size="small"
      required
      fullWidth
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle fontSize="inherit" />
            </InputAdornment>
          ),
        },
      }}
      variant="outlined"
    />
  );
}

function CustomPasswordField() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
      <InputLabel size="small" htmlFor="outlined-adornment-password">
        Password
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        name="password"
        size="small"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              size="small"
            >
              {showPassword ? (
                <VisibilityOff fontSize="inherit" />
              ) : (
                <Visibility fontSize="inherit" />
              )}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  );
}

function CustomButton() {
  return (
    <Button
      type="submit"
      variant="outlined"
      color="info"
      size="small"
      disableElevation
      fullWidth
      sx={{ my: 2 }}
    >
      Log In
    </Button>
  );
}

function SignUpLink() {
  return (
    <Link href="/" variant="body2">
      Sign up
    </Link>
  );
}

function ForgotPasswordLink() {
  return (
    <Link href="/" variant="body2">
      Forgot password?
    </Link>
  );
}

function Title() {
  return <h2 style={{ marginBottom: 8 }}>Login</h2>;
}

function Subtitle() {
  return (
    <Alert sx={{ mb: 2, px: 1, py: 0.25, width: '100%' }} severity="warning">
Input correct email and password
    </Alert>
  );
}

function RememberMeCheckbox() {
  const theme = useTheme();
  return (
    <FormControlLabel
      label="Remember me"
      control={
        <Checkbox
          name="remember"
          value="true"
          color="primary"
          sx={{ padding: 0.5, '& .MuiSvgIcon-root': { fontSize: 20 } }}
        />
      }
      slotProps={{
        typography: {
          color: 'textSecondary',
          fontSize: theme.typography.pxToRem(14),
        },
      }}
    />
  );
}

export default function Login() {
  const theme = useTheme();
    const router = useRouter();
  return (
    <AppProvider theme={theme}>
      <SignInPage
        signIn={(provider, formData) =>
{        console.log(`Logging in with "${provider.name}" and credentials: ${formData.get('email')}, ${formData.get('password')}, and checkbox value: ${formData.get('remember')}`)



const email = formData.get('email');
const password = formData.get('password')
console.log(email, password, 'this is email or password')

const loginHandle = async()=>{
try {

    const resp = await axiosInstance.post('/user/login', {email, password});
  console.log(resp?.data?.message, 'login-///')


  const token = resp?.data?.token;

  const role = resp?.data?.user?.role;


 const res = await signIn("credentials", {
     token,
     role,
      redirect: false,
    });


    console.log(res, 'login')

    if(res.status === 200){
  Swal.fire('Login sucessfully');

  router.push('/admin')
    }





  
} catch (error) {
  console.log(error)
   Swal.fire({
  icon: "error",
  title: "Oops...",
  text: error.response.data.message,
  footer: '<a href="#">Why do I have this issue?</a>'
});
}
}

loginHandle();

}



  
        }
        slots={{
         
          subtitle: Subtitle,
          emailField: CustomEmailField,
          passwordField: CustomPasswordField,
          submitButton: CustomButton,
          signUpLink: SignUpLink,
          rememberMe: RememberMeCheckbox,
          forgotPasswordLink: ForgotPasswordLink,
        }}
        slotProps={{ form: { noValidate: true } }}
        providers={providers}
      />
    </AppProvider>
  );
}
