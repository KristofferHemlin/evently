export function toasterCallback (that) {
                    
    actionMessage = that.props.navigation.getParam('actionMessage', '')
    console.log("toasterCallback actionMessage: ", actionMessage);
    willChange = that.props.navigation.getParam('willChange', false)
    console.log("toasterCallback willChange: ", willChange);
    if(willChange === true && that.state.haveChanged === false){
        console.log("toasterCallback IF: ");
        that.setState({
            actionMessage: actionMessage,
            haveChanged: true,
        })
    }
    else{
        console.log("toasterCallback ELSE: ");
        that.setState({
            actionMessage: null,
        })  
    }
}

