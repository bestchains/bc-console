import React from 'react';
import utils from '../../utils';

export interface DataProviderProps {
  render: (params: { [key: string]: any }) => JSX.Element;
  sdkSwrFuncs?: {
    func: string;
    params: object;
  }[];
}

const DataProvider: React.FC<DataProviderProps> = props => {
  const { render, sdkSwrFuncs } = props;
  const resArray = sdkSwrFuncs?.map(({ func, params }) => utils.bff[func]?.(params));
  const renderParams: { [key: string]: any } = {};
  sdkSwrFuncs?.forEach(({ func }, index) => {
    renderParams[func] = resArray?.[index];
  });
  renderParams.authData = utils.getAuthData();
  return render(renderParams);
};

export default DataProvider;
