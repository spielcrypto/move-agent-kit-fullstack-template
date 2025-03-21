import { IActionFunction } from 'helpers';
import { Logger } from '@nestjs/common';
import { ToolsNameList } from 'move-agent-kit-fullstack';

export class GetActionDto {
  name: ToolsNameList;
  args: any[];
  onchain: boolean;
  logger = new Logger('GetActionDto');

  static fromJson(json: IActionFunction): GetActionDto {
    return new GetActionDto(json.name, json.arguments);
  }

  constructor(name: ToolsNameList, args: string) {
    this.name = name;
    const values = JSON.parse(args);
    if (values?.input && Object.keys(values.input).length) {
      if (['aptos_balance', 'aptos_token_details'].includes(name)) {
        values.input = { balance: values.input };
      } else if (
        ![
          'emojicoin_swap',
          'emojicoin_get_market',
          'emojicoin_provide_liquidity',
          'emojicoin_register_market',
          'emojicoin_remove_liquidity',
          'emojicoin_swap',
          'emojicoin_chat',
        ].includes(name)
      ) {
        values.input = JSON.parse(values.input);
      }
    }
    this.args = Object.values(values?.input || values);
    this.onchain = true;
  }
}
