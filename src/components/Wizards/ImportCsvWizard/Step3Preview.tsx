import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";
import _find from "lodash/find";

import { makeStyles, createStyles } from "@mui/styles";
import { Grid } from "@mui/material";

import { IStepProps } from ".";
import Column from "../Column";
import Cell from "../Cell";

import { useProjectContext } from "contexts/ProjectContext";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position: "relative",
      minHeight: 300,
      height: "calc(100% - 80px)",
    },

    container: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },

    spacer: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      flexShrink: 0,
    },

    header: { overflowX: "hidden" },
    data: {
      overflow: "scroll",
      flexGrow: 1,
    },

    column: {
      width: 200,
      flexShrink: 0,
      marginLeft: -1,

      "&:first-of-type": { marginLeft: 0 },
    },
  })
);

export default function Step4Preview({ csvData, config }: IStepProps) {
  const classes = useStyles();
  const { tableState } = useProjectContext();

  if (!tableState) return null;

  const columns = config.pairs.map(({ csvKey, columnKey }) => ({
    csvKey,
    columnKey,
    ...(tableState!.columns[columnKey] ??
      _find(config.newColumns, { key: columnKey }) ??
      {}),
  }));

  return (
    <div className={classes.root}>
      <ScrollSync vertical={false} proportional={false}>
        <div className={classes.container}>
          <ScrollSyncPane>
            <Grid container wrap="nowrap" className={classes.header}>
              {columns.map(({ key, name, type }) => (
                <Grid item key={key} className={classes.column}>
                  <Column label={name} type={type} />
                </Grid>
              ))}
              <Grid item className={classes.spacer} />
            </Grid>
          </ScrollSyncPane>

          <ScrollSyncPane>
            <Grid container wrap="nowrap" className={classes.data}>
              {columns.map(({ csvKey, name, columnKey, type }) => (
                <Grid item key={csvKey} className={classes.column}>
                  {csvData.rows.map((row, i) => (
                    <Cell
                      key={csvKey + i}
                      field={columnKey}
                      value={row[columnKey]}
                      type={type}
                      name={name}
                    />
                  ))}
                  <Grid item className={classes.spacer} />
                </Grid>
              ))}
              <Grid item className={classes.spacer} />
            </Grid>
          </ScrollSyncPane>
        </div>
      </ScrollSync>
    </div>
  );
}
