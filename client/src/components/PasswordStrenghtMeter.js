import React from "react";
import zxcvbn from 'zxcvbn';

const PasswordStrenghtMeter = ({password}) => {
    const testResult = zxcvbn(password)
    const num = testResult.score * 100/4

    const creteLabelPassword = () => {
        switch(testResult.score){
            case 0:
                return 'Very weak';
            case 1:
                return 'Weak';
            case 2:
                return 'Fear';
            case 3:
                return 'Good';
            case 4:
                return 'Strong';
            default:
                return 'none';           
        }

    }

    const funcProgressColor = () => {
        switch(testResult.score){
            case 0:
                return '#999999';
            case 1:
                return '#ff3300';
            case 2:
                return '#ff9933';
            case 3:
                return '#99cc00';
            case 4:
                return '#28a745';
            default:
                return 'none';           
        }
    }
    
    const chanePasswordColor = () =>({
        
            width:`${num}%`,
            background: funcProgressColor(),
            height:"7px"
           
    })
    
  return (
    <>
    <div className="progress" style={{ height:"7px"}}>
       <div className="progress-bar" style={chanePasswordColor()}></div>
    </div>
    <p style={{color:funcProgressColor()}}>{creteLabelPassword()}</p>
    </>
  );
};

export default PasswordStrenghtMeter;