import { SpeedcontrolUtilServer } from 'speedcontrol-util'
import { getNodeCG } from '../../shared/nodecg'
export const speedcontrolUtil = new SpeedcontrolUtilServer(getNodeCG())
