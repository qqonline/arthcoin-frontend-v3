import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Button';
import CustomModal from '../../../components/CustomModal';
import CloseIcon from '../../../assets/img/CloseIcon.svg';
import happyMask from '../../../assets/svg/happyMask.svg';
import sadMask from '../../../assets/svg/sadMask.svg';

interface IProps {
    open: boolean;
    toggleOpen: () => void
}

export const WinModal = (props: IProps) => {
    return (
        <>
            <CustomModal
                // title={'MAHA Prize winning Criteria'}
                closeButton
                handleClose={props.toggleOpen}
                open={props.open}
                // modalBodyStyle={{}}
                modalContainerStyle={{background: 'transparent'}}
            >
                    <MainDiv>
                        <img style={{ position: 'absolute', display: 'flex', top: 5, right: 0, zIndex: 2 }} src={CloseIcon} height={24} onClick={props.toggleOpen} />

                        <MaskDiv>
                            <img src={happyMask} height={100} />
                        </MaskDiv>

                        <WinnerText>
                            Congratulations, You are the Winner!
                        </WinnerText>

                        <ButtonContainer>
                            <div style={{ width: '100%', display: 'flex' }}>
                                <Button
                                    variant={'default'}
                                    text={'Claim Prize'}
                                />
                            </div>

                            <div style={{ width: '100%', display: 'flex', marginTop: 16 }}>
                                <Button
                                    variant={'transparent'}
                                    text={'Close'}
                                    onClick={() => props.toggleOpen()}
                                />
                            </div>
                        </ButtonContainer>
                    </MainDiv>
            </CustomModal>
        </>
    )
}

const MainDiv = styled.div`
display: flex;
flex-direction: column;
position: relative;
// background: linear-gradient(180deg, rgba(72, 66, 62, 0) -19.91%, #373030 61.27%);`;

const MaskDiv = styled.div`
display: flex;
width: 100%;
// max-height: 120px;
align-items: center;
justify-content: center;
position: relative;
`;

const WinnerText = styled.div`
font-family: Inter;
font-style: normal;
font-weight: bold;
font-size: 24px;
line-height: 32px;
text-align: center;
color: #FFFFFF;
margin: 40px 0 0 0;
`;

const ButtonContainer = styled.div`
display: flex;
width: 100%;
margin: 32px 0 0 0;
flex-direction: column;
`;