import React from 'react'
import PropTypes from 'prop-types'
import {
  createMarkerStylesWithLeftOffset,
  createDefaultRenderer
} from './shared'

const defaultDurationMarkerRenderer = createDefaultRenderer(
  'default-duration-marker-id'
)
/**
 * DurationMarker that is placed based on passed in start and end date props
 */
class DurationMarker extends React.Component {
  static propTypes = {
    getLeftOffsetFromDate: PropTypes.func.isRequired,
    renderer: PropTypes.func,
    startDate: PropTypes.number.isRequired,
    endDate: PropTypes.number.isRequired
  }

  static defaultProps = {
    renderer: defaultDurationMarkerRenderer
  }
  render() {
    const { startDate, endDate } = this.props
    const leftOffset = this.props.getLeftOffsetFromDate(startDate)
    const width = this.props.getLeftOffsetFromDate(endDate) - leftOffset

    const styles = createMarkerStylesWithLeftOffset(leftOffset, Math.max(width, 2))
    return this.props.renderer({ styles, startDate })
  }
}

export default DurationMarker
