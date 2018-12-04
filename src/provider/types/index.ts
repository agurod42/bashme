import { TCommand } from '../../command/types';

export interface IProvider {

    getCommands(): Array<TCommand>;

}