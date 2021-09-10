import React, { useEffect, useState} from "react";
import Stepper from 'react-stepper-horizontal'


const Levels = ({ levelNames, quizLevel }) => {
  
  const [levels, setLevels] = useState([]);


  useEffect(() => {
    const quizSteps = levelNames.map(level => ({ title: level.toUpperCase() }))
    setLevels(quizSteps)
  }, [levelNames])
  console.log(levels)


  return (
    <div className="levelsContainer" style={{background: 'transparent'}}>
        <Stepper
          steps={levels}
        activeStep={quizLevel}    
        circleTop={0}
        activeTitleColor={'#832c31'}
        activeColor={'#832c31'}
        completeTitleColor={'#E0E0E0'}
        defaultTitleColor ={'#E0E0E0'}
        completeColor={'#E0E0E0'}
        completeBarColor={'#E0E0E0'}
        size={48}
        circleFontSize={24}
        />
    </div>
  );
};

export default React.memo(Levels);
