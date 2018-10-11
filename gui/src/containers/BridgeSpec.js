import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import PaddedCard from 'components/PaddedCard'
import Breadcrumb from 'components/Breadcrumb'
import BreadcrumbItem from 'components/BreadcrumbItem'
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { fetchBridgeSpec } from 'actions'
import { bridgeSelector } from 'selectors'
import matchRouteAndMapDispatchToProps from 'utils/matchRouteAndMapDispatchToProps'
import ReactStaticLinkComponent from 'components/ReactStaticLinkComponent'

const styles = theme => ({
  card: {
    marginTop: theme.spacing.unit * 5
  },
  breadcrumb: {
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 5
  }
})

const renderLoading = props => (
  <div>Loading...</div>
)

const renderLoaded = props => (
  <div className={props.classes.card}>
    <PaddedCard>
      <Grid>
        <Typography variant='subheading' color='textSecondary'>Name</Typography>
        <Typography variant='body1' color='inherit'>{props.bridge.name}</Typography>

        <Typography variant='subheading' color='textSecondary'>URL</Typography>
        <Typography variant='body1' color='inherit'>{props.bridge.url}</Typography>

        <Typography variant='subheading' color='textSecondary'>Confirmations</Typography>
        <Typography variant='body1' color='inherit'>{props.bridge.confirmations}</Typography>

        <Typography variant='subheading' color='textSecondary'>Minimum Contract Payment</Typography>
        <Typography variant='body1' color='inherit'>{props.bridge.minimumContractPayment}</Typography>

        <Typography variant='subheading' color='textSecondary'>Incoming Token</Typography>
        <Typography variant='body1' color='inherit'>{props.bridge.incomingToken}</Typography>

        <Typography variant='subheading' color='textSecondary'>Outgoing Token</Typography>
        <Typography variant='body1' color='inherit'>{props.bridge.outgoingToken}</Typography>
      </Grid>
    </PaddedCard>
  </div>
)

const renderDetails = props => props.bridge ? renderLoaded(props) : renderLoading(props)

export class BridgeSpec extends Component {
  componentDidMount () {
    this.props.fetchBridgeSpec(this.props.match.params.bridgeId)
  }

  render () {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Breadcrumb className={this.props.classes.breadcrumb}>
            <BreadcrumbItem href='/'>Dashboard</BreadcrumbItem>
            <BreadcrumbItem>></BreadcrumbItem>
            <BreadcrumbItem href='/bridges'>Bridges</BreadcrumbItem>
            <BreadcrumbItem>></BreadcrumbItem>
            <BreadcrumbItem>{this.props.bridge && this.props.bridge.id}</BreadcrumbItem>
          </Breadcrumb>
        </Grid>
        <Grid item xs={12} md={8} xl={6}>
          <Grid container alignItems='center'>
            <Grid item xs={9}>
              <Typography variant='display2' color='inherit'>
                Bridge Spec Details
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Grid container justify='flex-end'>
                <Grid item>
                  {this.props.bridge &&
                    <Button
                      variant='outlined'
                      color='primary'
                      component={ReactStaticLinkComponent}
                      to={`/bridges/${this.props.bridge.id}/edit`}
                    >
                      Edit
                    </Button>
                  }
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {renderDetails(this.props)}
        </Grid>
      </Grid>
    )
  }
}

BridgeSpec.propTypes = {
  classes: PropTypes.object.isRequired,
  bridge: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
  return {
    bridge: bridgeSelector(state, ownProps.match.params.bridgeId)
  }
}

export const ConnectedBridgeSpec = connect(
  mapStateToProps,
  matchRouteAndMapDispatchToProps({fetchBridgeSpec})
)(BridgeSpec)

export default withStyles(styles)(ConnectedBridgeSpec)
