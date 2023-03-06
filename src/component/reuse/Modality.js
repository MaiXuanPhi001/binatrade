import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Box from '@commom/Box'

const Modality = ({ show, setShow, animation, children }) => {
    // animation={'slide', 'fade', 'none'}

    return (
        <Modal
            animationType={animation}
            visible={show}
            transparent={true}
            onRequestClose={() => setShow(false)}
        >
            <Pressable style={{flex: 1}} onPress={() => setShow(false)}>
                <Box
                    flex={1}
                    alignCenter
                    justifyCenter
                    backgroundColor={'rgba(0,0,0,0.5)'}
                >
                    {children}
                </Box>
            </Pressable>
        </Modal>
    )
}

export default Modality

const styles = StyleSheet.create({})