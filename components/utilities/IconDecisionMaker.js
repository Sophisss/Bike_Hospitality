/**
 * Component to check the current platform the correct icon name.
 * 
 * @param {*} icoName base icon name
 * @returns the correct icon name, according to the current platform (ios-icoName for ios, md-icoName for android)
 */
function IconDecisionMaker(icon) {
    return Platform.OS === icon ? "ios-"+icon : "md-"+icon;
}

export default IconDecisionMaker;