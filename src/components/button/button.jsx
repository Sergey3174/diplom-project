import styled from 'styled-components';

const ButtonContainer = ({ className, width, children, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	width: ${({ width = '100%' }) => width};
	border-radius: 8px;
	border: 1px solid transparent;
	padding: 0.6em 1.2em;
	font-size: 1em;
	font-weight: 500;
	font-family: inherit;
	background-color: #5696fa;
	cursor: pointer;
	transition: border-color 0.25s;

	&:hover {
		cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
		border-color: blue;
	}

	&:focus,
	&:focus-visible {
		outline: 4px auto -webkit-focus-ring-color;
	}
`;
