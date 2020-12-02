import { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Container,
  ListGroup,
  ListGroupItem,
  Col,
  Table,
  ButtonGroup,
  Row,
  Card,
  CardText,
  CardHeader,
  CardTitle,
} from "reactstrap";

export const userTotalCashesSum = (tournaments) => {
  const buyInForArr = tournaments.map(({ buyInCost }) => buyInCost);
  const totalBuyInSum = buyInForArr.reduce((total, amount) => total + amount);

  const cashedForArr = tournaments.map(({ cashedFor }) => cashedFor);
  const totalCashSum = cashedForArr.reduce((total, amount) => total + amount);

  const numberOfTournamentsPlayed = tournaments.length;

  const avgBuyInCost = Math.round(totalBuyInSum / numberOfTournamentsPlayed);

  const totalProfit = totalCashSum - totalBuyInSum;
  return (
    <div>
      <Card className="text-center" style={{ width: "18rem" }}>
        <ListGroup variant="flush">
          <ListGroupItem>
            <CardText>Total Cashes</CardText> {totalCashSum}
          </ListGroupItem>
          <ListGroupItem>Total buyins: {totalBuyInSum}</ListGroupItem>
          <ListGroupItem>Total profit: {totalProfit}</ListGroupItem>
          <ListGroupItem>
            Tournaments played: {numberOfTournamentsPlayed}
          </ListGroupItem>
          <ListGroupItem>Avg Buyin: {avgBuyInCost}</ListGroupItem>
        </ListGroup>
      </Card>
    </div>
  );
};
