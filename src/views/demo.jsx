import PropTypes from 'prop-types';

const Demo = (props) => {
    const { title, x } = props
    return <div>{title}</div>
}

Demo.propTypes = {
    title: PropTypes.string.isRequired,
    x: PropTypes.number
}

export default Demo;
