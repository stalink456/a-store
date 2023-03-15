import React from "react";
import { Controller } from "react-hook-form";
import { Button } from "@alfalab/core-components/button";
import { Checkbox } from "@alfalab/core-components/checkbox";
import { Radio } from "@alfalab/core-components/radio";
import { Textarea } from "@alfalab/core-components/textarea";
import { MaskedInput } from "@alfalab/core-components/masked-input";
import { Typography } from "@alfalab/core-components/typography";
import { RadioGroup } from "@alfalab/core-components/radio-group";
import { Space } from "@alfalab/core-components/space";
import { TitleWithComponent } from "components/ui-components/title-with-component";
import { useOrder } from "hooks/use-order";
import { phoneMask } from "../../../constants";

import styles from "./order-form.module.css";

export const OrderForm: React.FC = () => {
  const {
    isLoading,
    control,
    reset,
    errors,
    handleSubmit,
    handleOnSubmitForm,
  } = useOrder();

  return (
    <form
      className={styles.order__form}
      onSubmit={handleSubmit(handleOnSubmitForm)}
      onReset={reset}
    >
      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TitleWithComponent title="ФИО">
            <MaskedInput
              value={value}
              placeholder="Фамилия Имя Отчество"
              block
              onChange={(event, payload) => {
                onChange(payload?.value);
              }}
              error={errors.name?.message?.toString()}
              data-testid="input-with-name"
            />
          </TitleWithComponent>
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TitleWithComponent title="e-mail">
            <MaskedInput
              placeholder="example@site.ru"
              block
              onChange={(event, payload) => {
                onChange(payload?.value);
              }}
              error={errors.email?.message?.toString()}
              data-testid="input-with-email"
            />
          </TitleWithComponent>
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TitleWithComponent title="Телефон">
            <MaskedInput
              placeholder="+7 000 000 00 00"
              block
              onChange={(event, payload) => {
                onChange(payload?.value);
              }}
              error={errors.phone?.message?.toString()}
              data-testid="input-with-phone"
              mask={phoneMask}
            />
          </TitleWithComponent>
        )}
      />

      <Controller
        name="address"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TitleWithComponent title="Адрес (если вы выбрали самовывоз — оставьте поле пустым)">
            <MaskedInput
              value={value}
              placeholder={"Индекс, город, улица, дом, квартира"}
              block
              onChange={(event, payload) => {
                onChange(payload?.value);
              }}
              error={errors.address?.message?.toString()}
              data-testid="input-with-address"
            />
          </TitleWithComponent>
        )}
      />

      <Controller
        name="deliveryType"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TitleWithComponent title="Доставка">
            <RadioGroup
              value={value}
              direction="vertical"
              onChange={(event, payload) => {
                onChange(payload?.value);
              }}
              error={errors.deliveryType?.message?.toString()}
            >
              <Radio
                label="Доставка по России — 350₽"
                value="Доставка по России — 350₽"
              />
              <Radio
                label="Курьером по Москве — 300₽"
                value="Курьером по Москве — 300₽"
              />
              <Radio
                label="Самовывоз (пр-т Андропова, 18 корп. 3)"
                value="Самовывоз (пр-т Андропова, 18 корп. 3)"
              />
            </RadioGroup>
          </TitleWithComponent>
        )}
      />

      <Controller
        name="promocode"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TitleWithComponent title="Промокод">
            <MaskedInput
              value={value}
              placeholder="Промокод"
              block
              onChange={(event, payload) => {
                onChange(payload?.value);
              }}
              data-testid="input-with-promocode"
            />
          </TitleWithComponent>
        )}
      />

      <Controller
        name="isAgree"
        control={control}
        render={({ field: { onChange, value = false } }) => (
          <Checkbox
            label="Согласен с политикой конфиденциальности и обработки персональных данных"
            onChange={(event, payload) => onChange(payload?.checked)}
            checked={value}
            error={errors.isAgree?.message?.toString()}
            data-testid="isAgree"
          />
        )}
      />

      <Controller
        name="comment"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Textarea
            value={value}
            block
            size="xl"
            label="Комментарий к заказу"
            onChange={(event, payload) => {
              onChange(payload?.value);
            }}
            className={styles.order__form__text_area}
          />
        )}
      />

      <Space className={styles.order__form__payment_information}>
        <Typography.Title tag="h6" weight="bold" view="large">
          Выберите способ оплаты «Промокод», если ваш заказ не превышает сумму
          промокода. Если больше — выберите оплату картой.
        </Typography.Title>
      </Space>

      <Controller
        control={control}
        name="paymentType"
        render={({ field: { onChange, value } }) => (
          <TitleWithComponent title="Способ оплаты">
            <RadioGroup
              direction="vertical"
              onChange={(event, payload) => {
                onChange(payload?.value);
              }}
              value={value}
              error={errors.paymentType?.message?.toString()}
            >
              <Radio label="Банковская карта" value="Банковская карта" />
              <Radio label="Промокод" value="Промокод" />
            </RadioGroup>
          </TitleWithComponent>
        )}
      />

      <Button
        type="submit"
        view="primary"
        block
        loading={isLoading}
        data-testid="confirm-form"
      >
        Дальше
      </Button>
    </form>
  );
};
