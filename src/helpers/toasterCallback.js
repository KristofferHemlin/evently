export function toasterCallback (that) {
    actionMessage = that.props.navigation.getParam('actionMessage', '')
    willChange = that.props.navigation.getParam('willChange', false)

    if(willChange === true && that.state.haveChanged === false){
        that.setState({
            actionMessage: actionMessage,
            haveChanged: true,
        })
    }
    else{
        that.setState({
            actionMessage: null,
        })  
    }
}

