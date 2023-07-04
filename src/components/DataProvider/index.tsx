import React, { useMemo } from 'react';

export interface DataProviderProps {
  render: (params: { [key: string]: any }) => JSX.Element;
  self: any;
  sdkInitFunc?: {
    enabled: boolean;
    func?: string;
    params?: {
      type: string;
      value: string;
    };
  };
  sdkSwrFuncs?: {
    func: string;
    params: object;
  }[];
}

const DataProvider: React.FC<DataProviderProps> = props => {
  const { render, sdkInitFunc, sdkSwrFuncs, self } = props;

  const sdk = useMemo(() => {
    if (sdkInitFunc?.enabled && sdkInitFunc?.func) {
      const _sdk = self.appHelper.utils[sdkInitFunc.func]?.(sdkInitFunc.params);
      if (_sdk) {
        return _sdk;
      }
    }
    return self.appHelper.utils.sdk || self.appHelper.utils.bff;
  }, []);

  const resArray = sdkSwrFuncs?.map(({ func, params }) => {
    return sdk[func]?.(params);
  });

  const renderParams = useMemo(() => {
    const params: { [key: string]: any } = {};
    sdkSwrFuncs?.forEach(({ func }, index) => {
      params[func] = resArray?.[index];
    });
    return params;
  }, [resArray]);
  return render(renderParams);
};

export default DataProvider;
