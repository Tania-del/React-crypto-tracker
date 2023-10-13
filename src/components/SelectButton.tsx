import { makeStyles } from '@mui/styles';
import React, { FC } from 'react'


const useStyles = makeStyles({
   selectbutton: {
     border: "1px solid gold",
     borderRadius: 5,
     padding: 10,
    textAlign: 'center',
     fontFamily: 'var(--montserrat)',
        cursor: "pointer",
     fontWeight: 500,
   //   backgroundColor: selected ? "gold" : "",
   //   color: selected ? "black" : "",
   //   fontWeight: selected ? 700 : 500,
     "&:hover": {
       backgroundColor: "gold",
       color: "black",
     },
     width: "22%",
       margin: 5,
    },
    
    
});

interface ISelectButton {
    children: string | number
    onClick: () => void;
    selected: boolean;
}

const SelectButton: FC<ISelectButton> = ({ children, selected, onClick }) => {
    const classes = useStyles();
    
  return (
   <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  )
}

export default SelectButton
