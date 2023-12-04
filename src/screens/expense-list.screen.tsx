import React, { useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';

import useLocation from '../core/hooks/use-location.hook';
import Colors from '../core/constans/styles/colors';
import { useAppSelector } from '../core/redux/store';
import { HomeScreens } from '../core/constans/screens.constants';
import { ExpenseItem } from '../core/redux/expense.slice';
import NextIcon from '../assets/next.png';

const ExpenseListScreen: React.FC = () => {

  const navigation = useNavigation();
  const { expenseList } = useAppSelector((state) => state.expenseList);

  useLocation();

  const goToExpenseDetails = useCallback(
    (expense: ExpenseItem) => {

      navigation.navigate(HomeScreens.EXPENSE_DETAIL, {
        expense: expense
      });

    }, [navigation]);

  const totalSpendAmount = useCallback(() => {

    let sum = 0;

    _.forEach(expenseList, (item) => {
      sum = sum + Number(item.amount);
    });

    return sum;
  }, [expenseList]);

  const renderItem = useCallback(({ item }) => (
    <View style={styles.listView}>
      <TouchableOpacity style={styles.nameView}
        onPress={() => goToExpenseDetails(item)}
      >
        <Text style={styles.item} >{item.name}</Text>
        <View style={styles.arrowView}>
          <Text style={styles.item}>{item.amount}</Text>
          <Image source={NextIcon} style={styles.icon} />
        </View>
      </TouchableOpacity>
    </View>
  ), []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainView}>
        <View style={styles.headerView}>
          <Text style={styles.title}>
            {'Good Morning,'}
          </Text>
          <Text style={styles.subTitle}>
            {'Track your expenses, start your day right'}
          </Text>
        </View>

        <View style={styles.spendAmountView}>
          <Text style={styles.amount}>{'Total Spend Amount'}</Text>
          <Text style={styles.totalAmount}>{totalSpendAmount()}</Text>
        </View>

        <FlatList
          data={expenseList}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainerStyle}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <View style={styles.emptyListView}>
              <Text style={styles.text}>
                {'No Expense in list'}
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    paddingHorizontal: 10,
  },
  headerView: {
    paddingVertical: 20,
  },
  emptyListView: {
    justifyContent: "center",
    alignItems: "center",
    padding: 60
  },
  text: {
    fontWeight: '600',
    fontSize: 20,
    color: Colors.text.darkGray
  },
  arrowView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  contentContainerStyle: {
    paddingBottom: 150,
    paddingTop: 10
  },
  amount: {
    color: Colors.basic.white,
    fontWeight: '700',
    fontSize: 12,
    paddingBottom: 5
  },
  nameView: {
    flex: 1,
    backgroundColor: Colors.basic.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingLeft: 10,
    borderRadius: 10
  },
  spendAmountView: {
    backgroundColor: Colors.secondary.blackBackground,
    height: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
  },
  totalAmount: {
    color: Colors.basic.white,
    fontWeight: '800',
    fontSize: 22
  },
  subTitle: {
    fontSize: 15,
    fontWeight: '400',
    color: Colors.text.darkGray,
    paddingTop: 5,
  },
  item: {
    fontSize: 18,
    fontWeight: '600'
  },
  icon: {
    width: 25,
    height: 25,
    marginLeft: 10,
    tintColor: Colors.text.darkGray,
  },
  listView: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 5,
    marginVertical: 6,
    elevation: 6,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 1,
    shadowOpacity: 0.1,
    shadowColor: Colors.basic.black,
    backgroundColor: Colors.basic.white,
    borderRadius: 5
  },
});

export default React.memo(ExpenseListScreen);