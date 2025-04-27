import useST from '../../reusable-components/useST';
import Spinner from '../Spinner/Spinner';

function Progress({ countryName }) {
    const { shippingData, isLoading } = useST();

    if (isLoading) return <Spinner />;
    if (!shippingData || shippingData.length === 0) return <p>No data available</p>;

    const countrydata = shippingData.find((d) => d.country === countryName);
    if (!countrydata) return null;

    const { averageShippingTime, goal } = countrydata;


    const remaining = averageShippingTime - goal;

    // Only show remaining if it's positive (meaning we still need to improve)
    const progressValue = remaining > 0 ? goal / averageShippingTime : 1;

    return (
        <>
            <progress value={progressValue} max="1" style={{ width: '100%' }} />
            {/* {remaining > 0 ? (
                <p>{remaining.toFixed(1)} days to reach the goal</p>
            ) : (
                <p>Goal achieved!</p>
            )} */}
        </>
    );
}

export default Progress;
