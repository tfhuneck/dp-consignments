import { Link } from 'react-router-dom';

function Element(props) {

    const classes = () => {
        const clss = props.class ? ' ' + props.class  : '';
        return 'card' + clss;
    }
    return (
        <div className={classes()}>
            <div className="card-body">
                {props.title && (<h5 className="card-title">{props.title}</h5>)}
                {props.subtitle && (<h6 className="card-subtitle mb-2 text-body-secondary">{props.subtitle}</h6>) }
                {props.text && (<div className="card-text">{props.text}</div>)}
                {props.link && (<Link to={props.to} className="card-link">{props.link}</Link>)}
                {props.body}
            </div>
        </div>
    )
}

export default Element;