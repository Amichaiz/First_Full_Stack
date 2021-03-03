
const Customer = (props) => {
    const {custdata} = props;
    const {customer_id,first_name,last_name,email,address,phone,city,country} = custdata
    return(
        <tr>
            <td>{customer_id}</td>
            <td>{first_name}</td>
            <td>{last_name}</td>
            <td>{email}</td>
            <td>{address},{city},{country}</td>
            <td>{phone}</td>
        </tr>
    )
}

export default Customer