import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Page from '../../components/Page';
import Modal from '../../components/NewModal/index';
import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import HomeCard from './components/HomeCard';
import { OverviewData } from './types';
import useBasisCash from '../../hooks/useBasisCash';
import config from '../../config';
import TranscationSnackbar from '../../components/TopBar/components/TranscationSnackbar';

const Home: React.FC = () => {
  const basisCash = useBasisCash();
  const [openModal, toggleModal] = useState(true);
  const [{ cash, bond, share }, setStats] = useState<OverviewData>({});
  const fetchStats = useCallback(async () => {
    const [cash, bond, share] = await Promise.all([
      basisCash.getCashStatFromUniswap(),
      basisCash.getBondStat(),
      basisCash.getShareStat(),
    ]);
    if (Date.now() < config.bondLaunchesAt.getTime()) {
      bond.priceInDAI = '-';
    }
    setStats({ cash, bond, share });
  }, [basisCash, setStats]);

  useEffect(() => {
    if (basisCash) {
      fetchStats().catch((err) => console.error(err.stack));
    }
  }, [basisCash, fetchStats]);

  const cashAddr = useMemo(() => basisCash.ARTH.address, [basisCash]);
  const shareAddr = useMemo(() => basisCash.MAHA.address, [basisCash]);
  const bondAddr = useMemo(() => basisCash.ARTHB.address, [basisCash]);
  const handleClose = () => {
    toggleModal(false);
  };
  return (
    <Page>
      <PageHeader
        icon="👋"
        subtitle="Buy, sell, and provide liquidity for ARTH and MAHA on Uniswap"
        title="Welcome to ARTH!"
      />
      <Spacer size="md" />
      {/* <TranscationSnackbar
        notificationCount={1}
        open
        title="Redeeming 4 ARTH"
        subtitle="Stability Fee = 4%"
        isScucess
      /> */}
      <Modal
        title="Disclaimer"
        open
        handleClose={handleClose}
        titleLogo={<InfoOutlinedIcon style={{ marginRight: '10px' }} />}
      >
        <ModalText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci habitant aliquet
          maecenas congue nisl feugiat tempus netus tempor. Ornare et pulvinar porta vitae.
        </ModalText>
        <ModalHyperLink>View token contract on Etherscan</ModalHyperLink>
      </Modal>
      <CardWrapper>
        <HomeCard
          title="ARTH"
          symbol="ARTH"
          color="#EEA7ED"
          supplyLabel="Circulating Supply"
          address={cashAddr}
          stat={cash}
        />
        <Spacer size="lg" />
        <HomeCard title="MAHA" symbol="MAHA" color="#E83725" address={shareAddr} stat={share} />
        <Spacer size="lg" />
        <HomeCard
          title="ARTH Bond"
          symbol="ARTHB"
          color="#ECF25C"
          address={bondAddr}
          stat={bond}
        />
      </CardWrapper>
    </Page>
  );
};

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;
const ModalText = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.64);
`;
const ModalHyperLink = styled.div`
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  text-decoration-line: underline;
  text-align: center;
  color: rgba(255, 255, 255, 0.64);
  margin-top: 20px;
`;
export default Home;
