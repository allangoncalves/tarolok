import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';

const Login = () => {
  return (
    <>
      <form method="get">
        <Button name="login" value="click" type="submit">
          Login
        </Button>
      </form>
    </>
  );
};

export default Login;