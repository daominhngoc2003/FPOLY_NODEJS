import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';
function NotFoundPage() {
    const navigate = useNavigate();

    // handle navigate to home page
    const handleNavigateHome = () => {
        navigate('/');
    };

    return (
        <div>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button onClick={handleNavigateHome} type="primary">Back Home</Button>}
            />
        </div>
    );
}
export default NotFoundPage