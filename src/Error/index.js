import { Space } from 'antd';
import { Result, Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import get from 'lodash/get';
import { useIntl } from '@kne/react-intl';
import withLocale from '../withLocale';

const Error = withLocale(props => {
  const location = useLocation();
  const { formatMessage } = useIntl();
  const subTitleEnum = {
    404: { title: '404', subTitle: formatMessage({ id: 'error_404_subTitle' }) },
    403: { title: '403', subTitle: formatMessage({ id: 'error_403_subTitle' }) },
    500: { title: '500', subTitle: formatMessage({ id: 'error_500_subTitle' }) }
  };
  const searchParams = new URLSearchParams(location.search);
  const status = props.status || searchParams.get('status') || 500;
  const msg = props.msg || searchParams.get('msg') || get(subTitleEnum[status], 'subTitle') || '';
  const navigate = useNavigate();
  return (
    <Result
      status={status}
      title={status || get(subTitleEnum[status], 'title') || 500}
      subTitle={msg}
      extra={
        props.baseUrl ? (
          <Space>
            <Button
              type="primary"
              onClick={() => {
                navigate(props.baseUrl);
              }}
            >
              {formatMessage({ id: 'notFound_backToHome' })}
            </Button>
          </Space>
        ) : null
      }
    />
  );
});

export default Error;
