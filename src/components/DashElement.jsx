
function Element(props) {

    const classes = () => {
        const clss = props.class ? ' ' + props.class  : '';
        return 'card' + clss;
    }
    return (
        <div className={classes()}>
            <div className="card-body">
                {props.title && (<h5 className="card-title">{props.title}</h5>)}
                {props.subtitle && (<h6 class="card-subtitle mb-2 text-body-secondary">{props.subtitle}</h6>) }
                {props.text && (<p className="card-text">{props.text}</p>)}
                {props.link && (<a href={props.href} class="card-link">{props.link}</a>)}
                {props.body}
            </div>
        </div>
    )
}

export default Element;