import React, { useCallback, useEffect, useState, useMemo } from 'react';
import {
  Modal,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

import { TabScreens } from '../constans/screens.constants';
import { useAppSelector } from '../redux/store';
import { setExpenseList } from '../redux/expense.slice';
import useLocation from '../hooks/use-location.hook';
import Colors from '../constans/styles/colors';
import { isIOS } from '../constans/platform.constants';
import CrossIcon from '../../assets/cross-icon.png';

export const MONEY_REGEXP = /[0-9]+([0-9]{0,2})?/;

const AddExpenseModal: React.FC = () => {

  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { top } = useSafeAreaInsets();

  const { expenseList } = useAppSelector(state => state.expenseList);
  const { userLat, userLng } = useLocation();

  const initialValues = useMemo(
    () => ({
      amount: '',
      name: '',
      description: '',
    }),
    [],
  );

  const onSubmit = useCallback(
    async (values: any) => {
      await dispatch(setExpenseList([
        { ...values, userLat, userLng },
        ...expenseList,
      ]));
      resetForm();
      closeModal();
    }, [
    expenseList,
    userLat,
    userLng
  ]);

  const { values, handleChange, setFieldValue, handleBlur, handleSubmit, resetForm } =
    useFormik({
      initialValues,
      onSubmit,
    });

  const onChange = useCallback(
    (text: string) => {
      const match = MONEY_REGEXP.exec(text);
      let value = '';

      if (match) {
        value = match[0];
      }

      setFieldValue('amount', value);
    },
    [setFieldValue],
  );

  const closeModal = useCallback(() => {
    setVisible(false);
    navigation.navigate(TabScreens.HOME);
  }, [visible]);

  const isSubmitDisabled = useMemo(() => {
    if ((values.amount && values.description && values.name) == '') {
      return true;
    }
    return false;
  }, [values]);

  return (
    <>
      {!visible ? (
        <View style={styles.addExpenseView}>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => setVisible(true)}
          >
            <Text style={styles.text}>{'Add Expense'}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Modal visible={visible}>
          <View style={[styles.container, { paddingTop: top }]}>
            <KeyboardAvoidingView
              enabled
              style={{ flex: 1 }}
              behavior={isIOS ? 'padding' : undefined}
              keyboardVerticalOffset={isIOS ? 10 : 0}
            >
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                  <TouchableOpacity
                    style={styles.crossIconBtn}
                    onPress={closeModal}>
                    <Image source={CrossIcon} style={styles.image} />
                  </TouchableOpacity>
                  <Text style={styles.title}>{'Add new expense'}</Text>
                  <Text style={styles.subTitle}>
                    {'Enter the details of your expense to help you track your spending.'}
                  </Text>

                  <View>
                    <Text style={styles.label}>{'Enter Amount'}</Text>
                    <TextInput
                      value={values.amount}
                      onChangeText={onChange}
                      onBlur={handleBlur('amount')}
                      keyboardType={'numeric'}
                      style={styles.inputContainer}
                    />
                    <Text style={styles.label}>{'Name'}</Text>
                    <TextInput
                      value={values.name}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      style={styles.inputContainer}
                    />
                    <Text style={styles.label}>{'Description'}</Text>
                    <TextInput
                      value={values.description}
                      onChangeText={handleChange('description')}
                      onBlur={handleBlur('description')}
                      style={styles.inputContainer}
                    />
                  </View>

                  <TouchableOpacity
                    disabled={isSubmitDisabled}
                    style={styles.addBtn}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.text}>{'Add Expense'}</Text>
                  </TouchableOpacity>
                </View>

              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </View>
        </Modal>
      )}
    </>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  crossIconBtn: {
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    padding: 12,
    marginBottom: 30,
    backgroundColor: Colors.secondary.surfaceSecondary,
    borderRadius: 50,
  },
  addExpenseView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  image: {
    width: 12,
    height: 12
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
  },
  subTitle: {
    fontSize: 15,
    fontWeight: '400',
    color: Colors.text.darkGray,
    paddingTop: 5,
    paddingBottom: 30
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 6,
    borderColor: Colors.secondary.surfaceSecondary,
    backgroundColor: Colors.secondary.surfaceSecondary,
    marginVertical: 15,
    height: 45,
  },
  addBtn: {
    backgroundColor: Colors.basic.black,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 5,
    marginTop: 10
  },
  text: {
    color: Colors.basic.white,
    fontWeight: "700"
  }
});

export default AddExpenseModal;