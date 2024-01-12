import React, { useState, useRef, useEffect } from 'react';
import {
  withModulesManager,
  withHistory,
  formatMessage,
  formatMessageWithValues,
  withTooltip,
  journalize,
  ProgressOrError,
} from '@openimis/fe-core';
import { injectIntl } from 'react-intl';
import { withTheme, withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Fab,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Box,
  Button,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {
  RIGHT_HERA_SUBSCRIPTIONS_CREATE,
} from "../constants";
import HeraNotificationsTopicPicker from "../pickers/HeraNotificationsTopicPicker";
import { createHeraSubscription } from "../actions";
import { ACTION_TYPE } from '../reducer';

const styles = (theme) => ({
  page: theme.page,
  fab: theme.fab,
});

function HeraSubscriptionsCreator(props) {
  const { intl, classes, rights, onNewSubscription, submittingMutation, mutation, journalize, createHeraSubscription } = props;
  const [dialogState, setDialogState] = useState({});
  const prevSubmittingMutationRef = useRef();


  // useEffect(() => {
  //   if (prevSubmittingMutationRef.current && !submittingMutation) {
  //     journalize(mutation);
  //     if (mutation?.actionType === ACTION_TYPE.CREATE_HERA_SUBSCRIPTION) {
  //       console.log("*** create hera sub mutation after journalize ***");
  //     }
  //   }
  // }, [submittingMutation]);
  //
  // useEffect(() => {
  //   prevSubmittingMutationRef.current = submittingMutation;
  // });

  const onAdd = (e) => {
    setDialogState({
      open: true,
      anchorEl: e.currentTarget,
      isUserSelecting: true,
      isLoading: false,
      isDone: false,
      data: null,
      success: false,
      mutationErrors: null,
      selected: false,
      topic: "",
    });
    console.log("*** state = ", dialogState);
  };

  const onDialogClose = (reason) => {
    console.log("*** on close ***");
    if (reason === "escapeKeyDown" || reason === "backdropClick") {
      return;
    }
    onNewSubscription(dialogState.success)
    setDialogState({
      ...dialogState,
      open: false,
      selected: false,
      isUserSelecting: false,
      isLoading: false,
      isDone: false,
      anchorEl: null,
      topic: "",
      mutationErrors: null,
    });
    console.log("*** refreshed parent ***");
  };

  const  onSubmit = async (e) => {
    console.log("*** on submit ***");
    setDialogState({
      ...dialogState,
      isUserSelecting: false,
      isLoading: true,
    })
    let result = await createHeraSubscription(
      dialogState.topic,
      formatMessageWithValues(intl, 'ecrvs', 'heraSubscriptions.create.mutationLabel', {"topic": dialogState.topic}),
    );
    console.log("*** state = ", dialogState);
    const status = result.status;
    if (status !== 2) {
      setDialogState({
        ...dialogState,
        isUserSelecting: false,
        isLoading: false,
        isDone: true,
        mutationErrors: result.error,
        success: false,
      })
    } else {
      setDialogState({
        ...dialogState,
        isUserSelecting: false,
        isLoading: false,
        isDone: true,
        data: result.payload,
        success: true,
      })
    }
    console.log("*** state = ", dialogState);
  }

  const getDialogTitle = () => {
    if (dialogState.isLoading) {
      return "heraSubscriptions.createDialog.title.loading";
    }
    else if (dialogState.isDone) {
      return "heraSubscriptions.createDialog.title.done";
    }
    return "heraSubscriptions.createDialog.title.selecting";
  }

  const getStatusLabel = () => {
    if (dialogState.success) {
      return "heraSubscriptions.createDialog.result.success";
    }
    return "heraSubscriptions.createDialog.result.failure";
  }

  return (
      <>
      {dialogState?.open && (
        <Dialog open onClose={onDialogClose} fullWidth maxWidth="sm">
          <DialogTitle>{formatMessage(intl, 'ecrvs', getDialogTitle())}</DialogTitle>
          <DialogContent>
            <ProgressOrError progress={dialogState.isLoading} />
            {dialogState.isDone && (
              <>
                <Box my={1}>
                  <b>{formatMessage(intl, 'ecrvs', "heraSubscriptions.createDialog.result.status")}</b>
                  <span>{formatMessage(intl, 'ecrvs', getStatusLabel())}</span>
                </Box>
                {!dialogState.success && (
                  <Box my={1}>
                    <b>{formatMessage(intl, 'ecrvs', "heraSubscriptions.createDialog.result.errorTitle")}</b>
                    {dialogState.mutationErrors.map(error => <span>{error.detail}</span>)}
                  </Box>
                )}
                {dialogState.success && (
                  <Box my={1}>
                    <b>{formatMessage(intl, 'ecrvs', "heraSubscriptions.createDialog.result.successTitle")}</b>
                    <span>{dialogState.topic}</span>
                  </Box>
                )}
              </>
            )}
            {dialogState.isUserSelecting && (
              <HeraNotificationsTopicPicker
                label="heraNotifications.topicPicker"
                withNull
                module={"ecrvs"}
                value={dialogState.topic}
                onChange={(value) => {
                    setDialogState({
                      ...dialogState,
                      topic: value,
                    })
                }}
              />
            )}
          </DialogContent>
          <DialogActions>
            {dialogState.isUserSelecting && (
              <>
                <Button
                  disabled={dialogState.topic === "" || dialogState.topic === null}
                  onClick={onSubmit}
                  variant="text"
                >
                  {formatMessage(intl, 'ecrvs', "heraSubscriptions.createDialog.okButton")}
                </Button>
                <Button
                  onClick={onDialogClose}
                  variant="contained"
                >
                  {formatMessage(intl, 'ecrvs', "heraSubscriptions.createDialog.cancelButton")}
                </Button>
              </>
            )}
            {dialogState.isDone && (
                <Button
                  onClick={onDialogClose}
                  variant="text"
                >
                  {formatMessage(intl, 'ecrvs', "heraSubscriptions.createDialog.result.okButton")}
                </Button>
            )}
          </DialogActions>
        </Dialog>
      )}
      {rights.includes(RIGHT_HERA_SUBSCRIPTIONS_CREATE)
        && withTooltip(
          <div className={classes.fab}>
            <Fab color="primary" onClick={onAdd}>
              <AddIcon />
            </Fab>
          </div>,
          formatMessage(intl, 'ecrvs', 'heraSubscriptions.createButton.tooltip'),
      )}
    </>
  );
}


const mapStateToProps = (state) => ({
  rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : [],
  mutation: state.ecrvs.mutation,
  submittingMutation: state.ecrvs.submittingMutation,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  createHeraSubscription,
  journalize,
}, dispatch);

export default withHistory(withModulesManager(injectIntl(withTheme(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(HeraSubscriptionsCreator))))));
