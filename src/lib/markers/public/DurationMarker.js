import React from 'react'
import PropTypes from 'prop-types'
import { TimelineMarkersConsumer } from '../TimelineMarkersContext'
import { TimelineMarkerType } from '../markerType'

class DurationMarker extends React.Component {
  static propTypes = {
    subscribeMarker: PropTypes.func.isRequired,
    updateMarker: PropTypes.func.isRequired,
    children: PropTypes.func,
    startDate: PropTypes.number.isRequired,
    endDate: PropTypes.number.isRequired
  }

  componentDidUpdate(prevProps) {
    if (
      (prevProps.startDate !== this.props.startDate ||
        prevProps.endDate !== this.props.endDate) &&
      this.getMarker
    ) {
      const marker = this.getMarker()
      this.props.updateMarker({ ...marker, startDate: this.props.startDate, endDate: this.props.endDate })
    }
  }

  componentDidMount() {
    const { unsubscribe, getMarker } = this.props.subscribeMarker({
      type: TimelineMarkerType.Duration,
      renderer: this.props.children,
      startDate: this.props.startDate,
      endDate: this.props.endDate
    })
    this.unsubscribe = unsubscribe
    this.getMarker = getMarker
  }

  componentWillUnmount() {
    if (this.unsubscribe != null) {
      this.unsubscribe()
      this.unsubscribe = null
    }
  }

  render() {
    return null
  }
}

// TODO: turn into HOC?
const DurationMarkerWrapper = props => {
  return (
    <TimelineMarkersConsumer>
      {({ subscribeMarker, updateMarker }) => (
        <DurationMarker
          subscribeMarker={subscribeMarker}
          updateMarker={updateMarker}
          {...props}
        />
      )}
    </TimelineMarkersConsumer>
  )
}

DurationMarkerWrapper.displayName = 'DurationMarkerWrapper'

export default DurationMarkerWrapper
