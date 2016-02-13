import React from "react";
import extend from "extend";

export var connectToStores = Component => class extends React.Component {

    constructor(props) {
        super(props);
        this.subs = [];
        this.props = props;
        this.state = Component.getState();
    }

    componentDidMount() {
        for (let store of Component.getStores()) {
            this.subs.push(store.listen(this.__onStoreChange.bind(this)));
        }
    }

    componentWillUnmount() {
        this.subs.forEach(s => s.unlisten(this.__onStoreChange));
    }

    __onStoreChange() {
        this.setState(Component.getState());
    }

    render() {
       let props = extend(this.state, this.props);
       return <Component {...props}/>;
    }
};

export default connectToStores;
