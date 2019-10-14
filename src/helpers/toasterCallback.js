export function toasterCallback (that) {
                    
    actionMessage = that.props.navigation.getParam('actionMessage', '')
    console.log("actionMessage: ", actionMessage);
    willChange = that.props.navigation.getParam('willChange', false)
    console.log("willChange: ", willChange);
    if(willChange === true && that.state.haveChanged === false){
        console.log("in IF: ");
        that.setState({
            actionMessage: actionMessage,
            haveChanged: true,
        })
    }
    else{
        console.log("in ELSE: ");
        that.setState({
            actionMessage: null,
        })  
    }
}

