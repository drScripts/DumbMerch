import React, { useCallback, useEffect, useState, useContext } from "react";
import CurrencyFormat from "react-currency-format";
import { Button, Col, Form, Row } from "react-bootstrap";
import { SimpleSelect, LoadingCircle } from "../../components";
import { API } from "../../services";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

const ShipmentContainer = ({ total }) => {
  const navigate = useNavigate();
  const [userState, dispatch] = useContext(UserContext);
  const [shipment, setShipment] = useState();
  const [shipmentType, setShipmentType] = useState([]);
  const [province, setProvince] = useState(null);
  const [city, setCity] = useState(null);
  const [cost, setCost] = useState(0);

  const [provinces, setProvinces] = useState([
    {
      label: "Select Your Province",
      value: "",
    },
  ]);
  const [cities, setCities] = useState([
    {
      label: "Select your province first",
      value: "",
    },
  ]);

  const onSelectChange = (value) => {
    if (value.name === "province") {
      setProvince(value.value);
    } else if (value.name === "city") {
      setCity(value.value);
    } else if (value.name === "shipment_type") {
      setCost(parseInt(value.value));
    }
  };

  const shipmentChangeHandler = (e) => {
    setShipment(e.target.value);
  };

  const getShipmentCity = useCallback(async () => {
    const { data, status } = await API.get(`/shipment/cities/${province}`);

    if (status === 200) {
      if (data) {
        const mappedData = data?.data?.map((value, index) => {
          return {
            label: value.type + " " + value.city_name,
            value: value.city_id,
          };
        });
        mappedData.unshift({
          label: "Select your city",
          value: "",
        });
        setCities(mappedData);
      }
    }
  }, [province]);

  const getShipmentCost = useCallback(async () => {
    setCost(0);
    if (shipment && city) {
      const { data, status } = await API.get("/shipment/cost", {
        params: {
          destination_city: city,
          courier: shipment,
        },
      });
      if (status === 200) {
        const mappedData = data?.data[0]?.costs?.map((costs, index) => {
          const type = costs?.service;
          const estd = costs.cost[0]?.etd + " Day";
          const cost = costs.cost[0]?.value;
          return {
            label: `${type} - ${estd}`,
            value: cost,
          };
        });
        mappedData.unshift({
          label: "Select shipment type",
          value: 0,
        });
        setShipmentType(mappedData);
      }
    }
  }, [city, shipment]);

  const getShipmentProvinces = async () => {
    const { data, status, message } = await API.get("/shipment/provinces");

    if (status === 200) {
      const newData = data?.data?.map((value, index) => {
        return {
          label: value.province,
          value: value.province_id,
        };
      });

      if (newData) {
        newData.unshift({
          label: "select your province",
          value: "",
        });
        setProvinces(newData);
      }
    } else {
      toast.error(message);
    }
  };

  const { mutate: onSubmit, isLoading } = useMutation(
    async () => {
      if (cost !== 0) {
        const body = JSON.stringify({
          shipment_service: shipment,
          shipment_cost: cost,
        });
        return await API.post("transaction", body, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        throw new Error("Please select shipment type");
      }
    },
    {
      onError: (err) => {
        const message = err?.response?.data?.message || err.message;
        toast.error(message);
      },
      onSuccess: (data) => {
        const id = data?.data?.data?.transaction?.id;
        dispatch({
          type: "CART_RESET",
        });
        navigate(`/transaction/${id}`);
      },
    }
  );

  useEffect(() => {
    toast.promise(getShipmentProvinces, {
      pending: "Getting province data!",
    });
  }, []);

  useEffect(() => {
    toast.promise(getShipmentCity, {
      pending: "Getting city data!",
    });
  }, [getShipmentCity]);

  useEffect(() => {
    getShipmentCost();
  }, [getShipmentCost]);

  return (
    <Col md={6}>
      <h2 className="text-orange mb-4">Detail Shipment</h2>
      <h4 className="text-light">Address</h4>
      <p className="text-justify text-light">
        {userState?.user?.profile?.address}
      </p>
      <Row className="mb-3">
        <SimpleSelect
          datas={provinces}
          label={"Select Your Province"}
          onChangeHandler={onSelectChange}
          name="province"
        />
        <SimpleSelect
          datas={cities}
          label={"Select Your City"}
          onChangeHandler={onSelectChange}
          name="city"
        />{" "}
        <div className="d-flex gap-4 mb-3">
          <Form.Check
            type={"radio"}
            id={`jne`}
            label={`JNE`}
            className="text-light"
            checked={shipment === "jne"}
            name={"shipment"}
            value="jne"
            onChange={shipmentChangeHandler}
          />
          <Form.Check
            type={"radio"}
            id={`pos`}
            label={`POS INDONESIA`}
            className="text-light"
            name={"shipment"}
            checked={shipment === "pos"}
            value="pos"
            onChange={shipmentChangeHandler}
          />
          <Form.Check
            type={"radio"}
            id={`tiki`}
            label={`TIKI`}
            className="text-light"
            name={"shipment"}
            checked={shipment === "tiki"}
            value="tiki"
            onChange={shipmentChangeHandler}
          />
        </div>
        <SimpleSelect
          datas={shipmentType}
          label={"Select Your Shipment Type"}
          onChangeHandler={onSelectChange}
          name="shipment_type"
          md={12}
        />
      </Row>

      <h5 className="text-light">
        Shipment Cost :{" "}
        <CurrencyFormat
          value={cost}
          prefix={"Rp. "}
          thousandSeparator={true}
          displayType={"text"}
        />
      </h5>
      <h5 className="text-light">
        Total :{" "}
        <CurrencyFormat
          value={total + cost}
          prefix={"Rp. "}
          thousandSeparator={true}
          displayType={"text"}
        />
      </h5>
      <Button
        disabled={cost === 0 || isLoading}
        variant="success"
        className="w-100 mt-4 mb-3"
        onClick={onSubmit}
      >
        <LoadingCircle isLoading={isLoading} />
        Checkout
      </Button>
    </Col>
  );
};

export default ShipmentContainer;
