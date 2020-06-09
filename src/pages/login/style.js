import styled from 'styled-components';

export const LoginWrapper = styled.div`
	z-index: 0;
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	top: 56px;
	background: #eee;
`;

export const LoginBox = styled.div`
	width: 350px;
	height: 200px;
	margin: 100px auto;
	padding-top: 20px;
	background: #fff;
	box-shadow: 0 0 8px rgba(0,0,0,.1);
`;

export const Input = styled.input`
	display: block;
	width: 200px;
	height: 30px;
	line-height: 30px;
	padding: 0 10px;
	margin: 10px auto;
	color: #777;
`;

export const ButtonWrapper = styled.div`
	width: 200px;
	height: 30px;
	line-height: 30px;
	color: #fff;
	background: #3194d0;
	border-radius: 15px;
	margin: 10px auto;
	text-align: center;
`;

export const ButtonWrapper2 = styled.div`
	width: 160px;
	height: 25px;
	line-height: 30px;
	color: #000;
	border-radius: 15px;
	margin: 10px auto;
	text-align: center;
`;
