import React from 'react';
import { ActivityIndicator } from 'react-native';
import constants from '../css/constants';

export default function Loader() {
  return (
    <ActivityIndicator size="small" color={constants.color_green} />
  )
};