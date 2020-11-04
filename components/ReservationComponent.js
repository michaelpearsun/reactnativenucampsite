import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';

export class Reservation extends Component {

    constructor(props) {
        super(props)

        this.state = {
            campers: 1,
            hikein: false,
            date: new Date(),
            showCalendar: false,
            
        };
    }

    static navigationOptions = {
        title: 'Reserve Campsite'
    }


    resetForm() {
        this.setState({
            campers: 1,
            hikein: false,
            date: new Date(),
            showCalendar: false,
        });
    }

    render() {
        return (
            <ScrollView>
                <Animatable.View animation='zoomInUp' duration={2000} delay={1000} >
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Number of Campers</Text>
                        <Picker
                            style={styles.formItem}
                            selectedValue={this.state.campers}
                            onValueChange={itemValue => this.setState({ campers: itemValue })}
                        >
                            <Picker.item label='1' value='1' />
                            <Picker.item label='2' value='2' />
                            <Picker.item label='3' value='3' />
                            <Picker.item label='4' value='4' />
                            <Picker.item label='5' value='5' />
                            <Picker.item label='6' value='6' />
                        </Picker>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Hike-In?</Text>
                        <Switch
                            style={styles.formItem}
                            value={this.state.hikein}
                            trackColor={{ true: '#5637DD', false: null }}
                            onValueChange={value => this.setState({ hikein: value })}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Date</Text>
                        <Button
                            onPress={() =>
                                this.setState({ showCalendar: !this.state.showCalendar })
                            }
                            title={this.state.date.toLocaleDateString('en-US')}
                            color='#5636DD'
                            accessibilityLabel='Tap me to select a date'
                        />
                    </View>
                    {this.state.showCalendar && (
                        <DateTimePicker
                            value={this.state.date}
                            mode={'date'}
                            display='default'
                            onChange={(event, selectedDate) => {
                                selectedDate && this.setState({ date: selectedDate, showCalendar: false })
                            }}
                            style={styles.formItem}
                        />
                    )}
                    <View style={styles.formRow}>
                        <Button
                            onPress={() => 
                                Alert.alert(
                                    'Begin Search?',
                                    'Number of Campers: ' + this.state.campers +
                                    '\n\nHike-In? ' + this.state.hikein +
                                    '\n\nDate ' + this.state.date,
                                    [
                                        {
                                            text: 'Cancel',
                                            style: 'cancel',
                                            onPress: () => console.log('Cancel Pressed')
                                        },
                                        {
                                            text: 'OK',
                                            onPress: () => this.resetForm()
                                        }
                                    ],
                                    { cancelable: false }
                                )
                            }
                            title='Search'
                            color='#5367DD'
                            accessibilityLabel='Tap me to search for available campsites to reserve'
                        />
                    </View>
                    
                    
                </Animatable.View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    }
})

export default Reservation;