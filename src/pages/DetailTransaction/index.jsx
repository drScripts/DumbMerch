import styles from './DetailTransaction.module.css'
import { Col, Container, Row, Button } from 'react-bootstrap'
import { Navbar } from '../../containers'
import { useParams } from 'react-router-dom'
import { SingleTransactionItem } from '../../components'
import CurrencyFormat from 'react-currency-format'
import { useQuery } from 'react-query'
import { API } from '../../services'

const DetailTransaction = () => {
  const { id } = useParams()

  const { data: transaction } = useQuery('transactionChace', async () => {
    const { data } = await API.get(`/transaction/${id}`)
    return data?.data?.transaction
  })

  return (
    <div>
      <Navbar />
      <Container className={'mt-4'}>
        <Row>
          <Col md={6}>
            <h2 className="text-orange mb-4">Detail Transaction</h2>
            <div className={`${styles.transactionFields}`}>
              {transaction?.transactionItems?.map((item, index) => (
                <SingleTransactionItem
                  product={item.itemProduct}
                  qty={item.qty}
                  key={index}
                />
              ))}
            </div>
          </Col>
          <Col md={6}>
            <h2 className="text-orange mb-4">Detail Shipment</h2>
            <h4 className="text-light">Address</h4>
            <p className="text-justify text-light">
              {transaction?.user?.profile?.address}
            </p>
            <h5 className="text-light">
              Shipment Services :{' '}
              {JSON.parse(transaction?.raw_body)?.item_details?.at(-1)?.name}
            </h5>
            <h5 className="text-light">
              Shipment Cost :{' '}
              <CurrencyFormat
                value={
                  JSON.parse(transaction?.raw_body)?.item_details?.at(-1)?.price
                }
                prefix={'Rp. '}
                thousandSeparator={true}
                displayType={'text'}
              />
            </h5>
            <h5 className="text-light">
              Total :{' '}
              <CurrencyFormat
                value={transaction?.total}
                prefix={'Rp. '}
                thousandSeparator={true}
                displayType={'text'}
              />
            </h5>
            <h5 className="text-light">Status : {transaction?.status}</h5>
            {(transaction?.status || 'pending') === 'pending' ? (
              <a
                href={transaction?.payment_url}
                rel="noreferrer"
                target="_blank"
                className="text-light text-decoration-none fw-bolder btn btn-primary w-100 mt-5"
              >
                Pay Transaction
              </a>
            ) : (
              <Button
                disabled={true}
                className="w-100 mt-5"
                variant={'secondary'}
              >
                Pay Transaction
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default DetailTransaction
