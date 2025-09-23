import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useIntl } from '@kne/react-intl';
import withLocale from '../withLocale';

const NotFound = withLocale(props => {
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  return (
    <Result
      status="404"
      title="404"
      subTitle={formatMessage({ id: 'notFound_subTitle' })}
      extra={
        props.baseUrl ? (
          <Button
            type="primary"
            onClick={() => {
              navigate(props.baseUrl);
            }}
          >
            {formatMessage({ id: 'notFound_backToHome' })}
          </Button>
        ) : null
      }
    />
  );
});

export default NotFound;
