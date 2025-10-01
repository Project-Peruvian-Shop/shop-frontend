interface ButtonPrimaryProps {
  text: string;
}

function ButtonPrimary(props: ButtonPrimaryProps) {
  const { text } = props;

  return <button className="btn-primary">{text}</button>;
}

export default ButtonPrimary;
