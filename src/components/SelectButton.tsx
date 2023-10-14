import { makeStyles } from '@mui/styles';
import React, { FC } from 'react'
import clsx from 'clsx';


const useStyles = makeStyles({
   selectbutton: {
     border: "1px solid gold",
     borderRadius: 5,
     padding: 10,
    textAlign: 'center',
     fontFamily: 'var(--montserrat)',
        cursor: "pointer",
     fontWeight: 500,
     "&:hover": {
       backgroundColor: "gold",
       color: "black",
     },
     width: "22%",
       margin: 5,
    },

    isSelected: {
        backgroundColor: 'gold',
        color: 'black',
        fontWeight: 700,
    }
});


interface ISelectButton {
    children: string | number
    onClick: () => void;
    selected: boolean;
}

const SelectButton: FC<ISelectButton> = ({ children, selected, onClick }) => {
    const classes = useStyles();
    
    return (
        <span onClick={onClick} className={clsx(classes.selectbutton, selected && classes.isSelected)}>
      {children}
    </span>
  )
}

export default SelectButton;
